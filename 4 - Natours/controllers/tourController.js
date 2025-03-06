const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
    console.log(req)
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'You must send a name and price'
        })
    };
    next();
}

exports.checkID = (req, res, next, val) => {
    console.log(val)
    if(Number(req.params.id) > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        data: {
            tours: tours,
        },
    });
};

exports.getTour = (req, res) => {
    const id = Number(req.params.id);
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        },
    });
};

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: { tour: newTour },
            });
        }
    );
};

exports.updateTour = (req, res) => {
    const id = Number(req.params.id);
    const newTours = tours.map((el) =>
        el.id === id ? Object.assign(el, req.body) : el
    );

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(newTours),
        (err) => {
            res.status(200).json({
                status: 'success',
            });
        }
    );
};

exports.deleteTour = (req, res) => {
    const id = Number(req.params.id);
    const newTours = tours.filter((el) => (el.id === id ? null : el));

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(newTours),
        (err) => {
            res.status(204).json({
                status: 'success',
            });
        }
    );
};