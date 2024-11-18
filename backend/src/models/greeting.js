class GreetingRequest {
    constructor(timeOfDay, language, tone) {
        this.timeOfDay = timeOfDay;
        this.language = language;
        this.tone = tone;
    }

    // Validate the request
    validate() {
        const errors = [];

        // Check if all required fields are present
        if (!this.timeOfDay) errors.push('timeOfDay is required');
        if (!this.language) errors.push('language is required');
        if (!this.tone) errors.push('tone is required');

        // Validate timeOfDay
        const validTimesOfDay = ['Morning', 'Afternoon', 'Evening'];
        if (this.timeOfDay && !validTimesOfDay.includes(this.timeOfDay)) {
            errors.push(`timeOfDay must be one of: ${validTimesOfDay.join(', ')}`);
        }

        // Validate tone
        const validTones = ['Formal', 'Casual'];
        if (this.tone && !validTones.includes(this.tone)) {
            errors.push(`tone must be one of: ${validTones.join(', ')}`);
        }

        return errors;
    }

    // Create a GreetingRequest from raw JSON data
    static fromJson(json) {
        return new GreetingRequest(
            json.timeOfDay,
            json.language,
            json.tone
        );
    }
}

class GreetingResponse {
    constructor(greetingMessage) {
        this.greetingMessage = greetingMessage;
    }

    // Convert response to JSON format
    toJson() {
        return {
            greetingMessage: this.greetingMessage
        };
    }

    // Create an error response
    static createError(message) {
        return {
            error: message
        };
    }
}

module.exports = {
    GreetingRequest,
    GreetingResponse
};