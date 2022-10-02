const mongoose = require('mongoose')
const { roomSchema } = require('../db')

// name
//n_beds
// type

module.exports = async (place, name, n_beds, type, page) => {
    if (!place) {
        if (name && n_beds && type) {
            const result = await roomSchema.paginate({
                name: { $regex: name, $options: "i" },
                n_beds: parseInt(n_beds),
                type: type,
            }, { limit: 6, page: page })
            return result
        }
        if (name && type) {
            const result5 = await roomSchema.paginate({
                name: { $regex: name, $options: "i" },
                type: type,
            }, { limit: 6, page: page })
            return result5
        }
        if (name && n_beds) {
            const result6 = await roomSchema.paginate({
                name: { $regex: name, $options: "i" },
                n_beds: parseInt(n_beds),
            }, { limit: 6, page: page })
            return result6
        }
        if (n_beds && type) {
            const result7 = await roomSchema.paginate({
                n_beds: parseInt(n_beds),
                type: type,
            }, { limit: 6, page: page })
            return result7
        }
        if (name) {
            let foundRoomName = await roomSchema.paginate({ name: { $regex: name, $options: "i" } }, { limit: 6, page: page })
            return foundRoomName
        }
        if (n_beds) {
            let foundRoomN_beds = await roomSchema.paginate({ n_beds: n_beds }, { limit: 6, page: page })
            return foundRoomN_beds
        }
        if (type) {
            let foundRoomType = await roomSchema.paginate({ type: { $regex: type, $options: "i" } }, { limit: 6, page: page })
            return foundRoomType
        }
    }
    if (name && n_beds && type) {
        const result1 = await roomSchema.paginate({
            place: { $regex: place, $options: "i" },
            name: { $regex: name, $options: "i" },
            n_beds: parseInt(n_beds),
            type: type,
        }, { limit: 6, page: page })
        return result1
    }
    if (name && type) {
        const result2 = await roomSchema.paginate({
            place: { $regex: place, $options: "i" },
            name: { $regex: name, $options: "i" },
            type: type,
        }, { limit: 6, page: page })
        return result2
    }
    if (name && n_beds) {
        const result3 = await roomSchema.paginate({
            place: { $regex: place, $options: "i" },
            name: { $regex: name, $options: "i" },
            n_beds: parseInt(n_beds),
        }, { limit: 6, page: page })
        return result3
    }
    if (n_beds && type) {
        const result4 = await roomSchema.paginate({
            place: { $regex: place, $options: "i" },
            n_beds: parseInt(n_beds),
            type: type,
        }, { limit: 6, page: page })
        return result4
    }
    if (name) {
        let foundRoomName = await roomSchema.paginate({ place: { $regex: place, $options: "i" }, name: { $regex: name, $options: "i" } }, { limit: 6, page: page })
        return foundRoomName
    }
    if (n_beds) {
        let foundRoomN_beds = await roomSchema.paginate({ place: { $regex: place, $options: "i" }, n_beds: n_beds }, { limit: 6, page: page })
        return foundRoomN_beds
    }
    if (type) {
        let foundRoomType = await roomSchema.paginate({ place: { $regex: place, $options: "i" }, type: { $regex: type, $options: "i" } }, { limit: 6, page: page })
        return foundRoomType
    }
} 