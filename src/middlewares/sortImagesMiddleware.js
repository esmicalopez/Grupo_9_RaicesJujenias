function sortImagesMiddleware (req, res, next) {
    if (req.query.newList === undefined) {
        req.newFiles = req.files.length === 0 ? false : req.files
        next()
    }

    const { newList } = req.query
    const { files } = req
    const newArrayFiles = []

    for (const image of JSON.parse(newList)) {
        if (image === "false") {
            newArrayFiles.push(false)
            continue
        }

        for (const file of files) {
            if (image === file.originalname) {
                newArrayFiles.push(file)
                break
            }
        }
    }

    req.newFiles = newArrayFiles

    next()
}

module.exports = sortImagesMiddleware
