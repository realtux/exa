export default new class timer {

    async delay(ms) {
        await new Promise(res => setTimeout(res, ms));
    }

};
