function gen_map_image(_map_name) {
    switch (_map_name) {
        case 'welcome':
            return __dirname + '/images/welcome.jpg'
            // res.sendFile(__dirname + '/images/maps/welcome.jpg');
            break
        case 'MapsImages_KingOfTheHill':
            return __dirname + '/images/kingOfTheHill.jpg'
            // res.sendFile(__dirname + '/images/maps/kingOfTheHill.jpg');
            break
        case 'MapsImages_Islands':
            return __dirname + '/images/islands.jpg'
            // res.sendFile(__dirname + '/images/maps/islands.jpg');
            break;
        case 'MapsImages_TreeHouse':
            return __dirname + '/images/treeHouse.jpg'
            // res.sendFile(__dirname + '/images/maps/treeHouse.jpg');
            break;
        case 'MapsImages_FirstTown':
            return __dirname + '/images/firstTown.jpg'
            // res.sendFile(__dirname + '/images/maps/firstTown.jpg');
            break;
    }
}

module.exports = gen_map_image;
