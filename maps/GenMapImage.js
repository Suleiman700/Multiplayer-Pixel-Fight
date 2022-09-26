function gen_map_image(_map_name) {
    switch (_map_name) {
        case 'welcome':
            return __dirname + '/images/welcome.jpg'
            // res.sendFile(__dirname + '/images/maps/welcome.jpg');
        case 'MapsImages_KingOfTheHill':
            return __dirname + '/images/kingOfTheHill.jpg'
        case 'MapsImages_Islands':
            return __dirname + '/images/islands.jpg'
        case 'MapsImages_TreeHouse':
            return __dirname + '/images/treeHouse.jpg'
        case 'MapsImages_FirstTown':
            return __dirname + '/images/firstTown.jpg'
        case 'MapsImages_LakeHouse':
            return __dirname + '/images/lakeHouse.jpg'
        case 'MapsImages_Street':
            return __dirname + '/images/street.jpg'
        case 'MapsImages_SmallCity':
            return __dirname + '/images/smallCity.jpg'
        case 'MapsImages_FourTeamsTown':
            return __dirname + '/images/fourTeamsTown.jpg'
    }
}

module.exports = gen_map_image;
