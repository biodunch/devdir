class ContactsController {
    constructor(contactsService, rolesService, log) {
        this.contactsService = contactsService;
        this.rolesService = rolesService;
        this.log = log;
    }

    async createContact(req, res) {
        try {
            const { body } = req;
            const result = await this.contactsService.create(body);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async getContact(req, res) {
        try {
            const { params } = req;
            const result = await this.contactsService.fetch(params);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async getAllContacts(req, res) {
        try {
            const result = await this.contactsService.fetchAll();
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async getAllContactsByRole(req, res) {
        try {
            const { params } = req;
            const result = await this.contactsService.fetchAllByRole(params);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async updateContact(req, res) {
        try {
            const { body } = req;
            const result = await this.contactsService.update(body);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }

    async deleteContact(req, res) {
        try {
            const { params } = req;
            const result = await this.contactsService.delete(params);
            return res.send(result);
        } catch (err) {
            this.log.error(err.message);
            return res.send(500, err);
        }
    }
}

module.exports = ContactsController;
