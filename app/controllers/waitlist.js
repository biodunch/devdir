class WaitListController {
    constructor(waitListService, log) {
        this.waitListService = waitListService;
        this.log = log;
    }

    async joinWaitList(req, res) {
        try {
            const { body } = req;
            const result = await this.waitListService.join(body);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async getWaitList(req, res) {
        try {
            const result = await this.waitListService.fetch();
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }
}

module.exports = WaitListController;
