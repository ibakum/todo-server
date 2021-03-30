function customError(response) {
    return response.status(500).json({
        message: 'server error'
    })
}

module.exports = customError;