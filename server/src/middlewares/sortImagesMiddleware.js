function sortImagesMiddleware (req, res, next) {
    const { newList } = req.query
    const { files } = req

    if (newList === undefined) {
        req.newFiles = files.length === 0 ? false : files
        return next()
    }

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
