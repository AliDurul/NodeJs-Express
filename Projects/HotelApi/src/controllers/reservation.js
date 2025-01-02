"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:

const Room = require("../models/room");

const Reservation = require("../models/resarvation");
module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "List Reservations"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */

    const data = await res.getModelList(Reservation,{},["userId",'roomId']);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Reservation),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "Reservationname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
    req.body.userId = req.user._id;
    const guests = req.body.guestNumber;

    /*   "arrivalDate": "2012-01-26T13:51:50.417-07:00",
    "departureDate": "2012-01-28T13:51:50.417-07:00", */

    const arrivalDate = new Date(req.body.arrivalDate);
    const departureDate = new Date(req.body.departureDate);

    const timeDifference = departureDate - arrivalDate;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    req.body.night = daysDifference;

    if (1 <= guests && guests <= 3) {
      const rooms = await Room.find({ bedType: "single" });

       if(!rooms){
        req.errorStatusCode = 402
        throw new Error('There is availabe room for your request ')
       }

      req.body.roomId = rooms[0]._id.toString()
      req.body.price = rooms[0].price
      
    } else if(4 <= guests && guests <= 6){
        const rooms = await Room.find({ bedType: "family" });

       if(!rooms){
        req.errorStatusCode = 402
        throw new Error('There is availabe room for your request ')
       }

      req.body.roomId = rooms[0]._id.toString()
      req.body.price = rooms[0].price
    }else{
        const rooms = await Room.find({ bedType: "bigFamily" });

        if(!rooms){
         req.errorStatusCode = 402
         throw new Error('There is availabe room for your request ')
        }
 
       req.body.roomId = rooms[0]._id.toString()
       req.body.price = rooms[0].price
    }

    req.body.totalPrice = req.body.night * req.body.price

    const data = await Reservation.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Get Single Reservation"
        */

    const data = await Reservation.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "Reservationname": "test",
                    "password": "1234",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */

    const data = await Reservation.updateOne({ _id: req.params.id }, req.body);

    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Reservations"]
            #swagger.summary = "Delete Reservation"
        */

    const data = await Reservation.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
