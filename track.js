module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Track", {
        _id: DataTypes.STRING,
        artworkUrl60: DataTypes.STRING,
        trackName: DataTypes.STRING,
        artistName: DataTypes.STRING,
        previewUrl: DataTypes.STRING
    })
}

