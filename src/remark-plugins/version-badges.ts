import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Parent } from 'unist';
import type { Paragraph } from 'mdast';

const INLINE_REGEX = /!(since|changed|deprecated)\[([^\]]+)\]/g;

const remarkVersionBadges: Plugin = () => {
    return (tree) => {
        visit(tree, 'paragraph', (node, index, parent) => {
            const paragraph = node as Paragraph;
            const parentNode = parent as Parent;

            if (!paragraph.children || paragraph.children.length !== 1) return;

            const child = paragraph.children[0];
            if(child.type !== 'text') return;

            const value = child.value;

            const matches = [...value.matchAll(INLINE_REGEX)];
            if(matches.length === 0) return;

            const isOnlyBadges = matches.reduce((allMatched, match) => {
                return allMatched && match[0] === value.slice(match.index!, match.index! + match[0].length)
            }, true);

            if (!isOnlyBadges) return;

            const badges: string[] = matches.map(([_, type, version]) => {
                let label = '';
                let className = '';
                let title = '';
                switch(type) {
                    case 'since': 
                        label = `Since v${version}`;
                        className = 'since-badge';
                        title = `This feature was added in v${version}`;
                        break;
                    case 'changed':
                        label = `Changed in v${version}`;
                        className = 'changed-badge';
                        title = `This feature was changed in v${version}`;
                        break;
                    case 'deprecated':
                        label = `Deprecated since v${version}`;
                        className = 'deprecated-badge'
                        title = `This feature is deprecated since v${version}`;
                        break;
                }
                return `<span class="${className}" title="${title}">${label}</span>`;
            });

            const htmlNode = {
                type: 'html',
                value: `<div class="version-badges">${badges.join('')}</div>`,
            } as const;

            parentNode.children.splice(index!, 1, htmlNode);
        });
    }
}

export default remarkVersionBadges;