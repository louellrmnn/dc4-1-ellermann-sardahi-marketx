const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
app.use('/api/campaign', (req, res, next) => {
    const campaign = [
      {
        name: 'campagne1',
        description: 'Les infos de ma première campagne',
        startDate: '2023-01-01',
        endDate: '2023-02-01',
        budget: 4900,
      },
      {
        name: 'campagne2',
        description: 'Les infos de ma première campagne',
        startDate: '2023-01-01',
        endDate: '2023-02-01',
        budget: 6500,
      },
    ];
    res.status(200).json(campaign);
  });

module.exports = app;