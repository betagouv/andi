// test ecrasement config
module.exports = {

	// Path to REST API
	apiPath: '/api/v1/',
	apiPort: process.env.PORT || 2000,

	graphQL: true,
	schemaQueries: true,

	// DB connection
	connectionString: process.env.DATABASE_URL || 'postgres://evol:love@localhost:5432/Evolutility', 
	schema: 'public',

	// OPTIONS
	// Pagination and maximum number of rows
	pageSize: 100,
	lovSize: 200,
	csvSize: 1000,
	csvHeader: 'id', //label', // possible values: id, label

	// - Timestamp columns u_date and c_date w/ date of record creation and last update 
	wTimestamp: true,
	// - "WhoIs" columns u_uid and c_uid w/ userid of creator and last modifier
	wWhoIs: false,
	// - Comments & Ratings (community feature) 
	wComments: false,
	wRating: false,
    createdDateColumn: 'date_created',
    updatedDateColumn: 'date_updated',

	// - API discovery
	apiInfo: true,

	// Directory for uploaded files
	uploadPath: '../evolutility-ui-react/public/pix/',

	// Console log
	consoleLog: true,

};
