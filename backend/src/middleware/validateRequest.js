const { GreetingRequest } = require('../models/greeting');

function validateGreetingRequest(req, res, next) {
    try {
        // Create a GreetingRequest object from the request body
        const greetingRequest = GreetingRequest.fromJson(req.body);
        
        // Validate the request
        const errors = greetingRequest.validate();
        
        if (errors.length > 0) {
            // If there are validation errors, return a 400 response
            return res.status(400).json({
                errors: errors
            });
        }

        // Attach the validated request to the req object
        req.greetingRequest = greetingRequest;
        next();
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({
            error: 'Invalid request format'
        });
    }
}

module.exports = {
    validateGreetingRequest
};