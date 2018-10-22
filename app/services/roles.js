class RolesService {
    constructor(log, mongoose) {
        this.mongoose = mongoose;
        this.log = log;
    }

    async create(name, description) {
        const Roles = this.mongoose.model('Roles');
        description = description ? description : 'Just another Dev. role';
        const role = new Roles({ title: name, description });
        return await role.save();
    }

    async getRoleContacts() {}
}

module.exports = RolesService;
