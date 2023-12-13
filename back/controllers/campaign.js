const uuid = require('uuid/v1');
const Campaign = require('../models/Campaign');

exports.getAllCampaign = (req, res, next) => {
  Campaign.find().then(
    (campaigns) => {
      const mappedCampaign = campaigns.map((campaign) => {
        campaign.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + campaign.imageUrl;
        return campaignt;
      });
      res.status(200).json(mappedCampaign);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  );
};

exports.getOneCampaignt = (req, res, next) => {
    Campaign.findById(req.params.id).then(
    (campaign) => {
      if (!campaign) {
        return res.status(404).send(new Error('Campaign not found!'));
      }
      campaign.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + campaign.imageUrl;
      res.status(200).json(campaign);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
exports.orderCampaign = (req, res, next) => {
  if (!req.body.contact ||
      !req.body.contact.firstName ||
      !req.body.contact.lastName ||
      !req.body.contact.address ||
      !req.body.contact.city ||
      !req.body.contact.email ||
      !req.body.campaigns) {
    return res.status(400).send(new Error('Bad request!'));
  }
  let queries = [];
  for (let campaignId of req.body.campaigns) {
    const queryPromise = new Promise((resolve, reject) => {
        Campaign.findById(campaignId).then(
        (campaign) => {
          if (!campaign) {
            reject('Campaign not found: ' + campaignId);
          }
          campaign.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + campaign.imageUrl;
          resolve(campaign);
        }
      ).catch(
        () => {
          reject('Database error!');
        }
      )
    });
    queries.push(queryPromise);
  }
  Promise.all(queries).then(
    (campaigns) => {
      const orderId = uuid();
      return res.status(201).json({
        contact: req.body.contact,
        campaigns: campaigns,
        orderId: orderId
      })
    }
  ).catch(
    (error) => {
      return res.status(500).json(new Error(error));
    }
  );
};
