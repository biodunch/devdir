class DevelopersService {
    constructor(rolesService, log, errs, mongoose) {
        this.log = log;
        this.errs = errs;
        this.mongoose = mongoose;
        this.rolesService = rolesService;
    }

    async create(body) {
        const DevelopersContact = this.mongoose.model('DevelopersContact');
        const Roles = this.mongoose.model('Roles');
        const { email, fullname, role } = body;
        let devRole = await Roles.findOne({
            title: role
        }).exec();

        if (!devRole) {
            // Create Role if it doesn't exist
            devRole = await this.rolesService.create(role);
        }

        const contact = await DevelopersContact.findOne({
            email
        }).exec();

        if (contact) {
            const err = new this.errs.InvalidContentError(
                "Developer's contact already exists"
            );
            this.log.error(err.message);
            return err;
        }

        let developerContact = new DevelopersContact(body);
        developerContact.role = devRole._id;
        developerContact = await developerContact.save();

        if (developerContact instanceof Error) {
            const err = new this.errs.InvalidContentError(
                developerContact.message
            );
            this.log.error(err.message);
            return err;
        }

        this.log.info(
            `Developer - ${fullname} contact was created successfully `
        );
        return developerContact;
    }

    async fetch(params) {
        const DevelopersContact = this.mongoose.model('DevelopersContact');
        const { email, github, twitter } = params;

        const contact = await DevelopersContact.findOne(
            {
                $or: [{ email }, { github }, { twitter }]
            },
            'fullname twitter github phone_number email role -_id '
        ).populate('role', 'title -_id').exec();

        if (!contact) {
            const err = new this.errs.NotFoundError(
                "Developer's contact wasn't found! Create It!"
            );
            this.log.error(err.message);
            return err;
        }

        this.log.info(`Developer - ${twitter} contact fetched successfully `);
        return contact;
    }

    async fetchAllByRole(params) {
        const DevelopersContact = this.mongoose.model('DevelopersContact');
        const Roles = this.mongoose.model('Roles');
        const { title } = params;
        let devRole = await Roles.findOne({ title })
            .select('_id')
            .exec();

        const contacts = await DevelopersContact.find(
            {
                role: devRole
            },
            'fullname twitter github phone_number email role -_id '
        ).populate('role', 'title -_id').exec();

        this.log.info(`Developers contact fetched successfully `);
        return contacts;
    }

    async fetchAll() {
        const DevelopersContact = this.mongoose.model('DevelopersContact');
        const contacts = await DevelopersContact.find(
            {},
            'fullname twitter github phone_number email role -_id'
        ).populate('role', 'title -_id').exec();

        this.log.info('All Developers Contact Fetched Successfully');
        return contacts;
    }

    async update(body) {
        const DevelopersContact = this.mongoose.model('DevelopersContact');
        const Roles = this.mongoose.model('Roles');
        const { email, github, twitter, fullname, phone_number, role } = body;
        let devRole = await Roles.findOne({
            title: role
        }).exec();

        if (!devRole) {
            // Create Role if it doesn't exist
            devRole = await this.rolesService.create(role);
        }

        let contact = await DevelopersContact.findOne({
            $or: [{ email }, { github }, { twitter }]
        }).exec();

        if (!contact) {
            const err = new this.errs.NotFoundError(
                "Developer's contact wasn't found! Create It!"
            );
            this.log.error(err.message);
            return err;
        }

        contact = await DevelopersContact.findOneAndUpdate(
            { $or: [{ email }, { github }, { twitter }] },
            {
                $set: {
                    email,
                    github,
                    twitter,
                    fullname,
                    phone_number,
                    role: devRole._id
                }
            },
            {
                new: true
            }
        ).exec();

        if (contact instanceof Error) {
            const err = new this.errs.InvalidContentError(contact.message);
            this.log.error(err.message);
            return err;
        }

        this.log.info(`Contact - ${contact.full_name} updated successfully`);

        return contact;
    }

    async delete(params) {
        const DevelopersContact = this.mongoose.model('DevelopersContact');
        const { email, github, twitter } = params;
        let contact = await DevelopersContact.findOne({
            $or: [{ email }, { github }, { twitter }]
        })
            .select('_id')
            .exec();
        contact = await DevelopersContact.findByIdAndRemove(contact).exec();

        return 'Contact deleted successfully';
    }
}

module.exports = DevelopersService;
