    let prevModel = monaco.editor.getModel(uri);
    if (prevModel) {
        prevModel.setValue(file.content);
    } else {
