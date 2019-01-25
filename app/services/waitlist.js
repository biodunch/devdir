class WaitListService {
    constructor(log, errs, models, emailService, hashids) {
        this.log = log;
        this.errs = errs;
        this.models = models;
        this.emailService = emailService;
        this.hashids = hashids;
    }

    async join(body) {
        const { email, list_token } = body;
        const WaitList = this.models.WaitList;
        let waiter = await WaitList.findOne({ where: { email } });

        if (waiter) {
            const err = new this.errs.InvalidContentError(
                'You already joined the WaitList'
            );
            this.log.error(err.message);
            return err;
        }

        waiter = await WaitList.create(body);
        const urlToken = waiter.generateUniqueLink(waiter.id);
        waiter.ref_link = `https://collabo.ng/waitlist/${urlToken}`;
        await waiter.save();
        await referralEmail = await this._addPointToReferral(list_token);
        const message = `You have successfully joined the waiting list. Here's your unique referral link ${waiter['ref_link']}. Share with Friends and Family!`;
        await this.emailService.sendEmail(
            email,
            'Joined Waiting List',
            message
        );

        return "You successfully joined the Waiting List";
    }

    async fetch() {
        const WaitList = this.models.WaitList;
        const waitlist = await WaitList.find();

        return waitlist;
    }

    async _addPointToReferral(list_token) {
        const referralId = this.hashids.decode(list_token)
        const WaitList = this.models.WaitList;
        const waiter = await WaitList.findOne({ where: { id: referralId } });
        waiter.rank += 1;
        await waiter.save();
    }
}

module.exports = WaitListService;
