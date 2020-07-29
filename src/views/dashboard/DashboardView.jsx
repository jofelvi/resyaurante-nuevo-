import React from 'react';

// Material
import { Typography, Card, CardContent } from '@material-ui/core';

const DashboardView = () => (
  <div>
    <Typography
      variant="h2"
      color="textPrimary"
      style={{ fontSize: 18, fontWeight: 600, marginBottom: 15 }}>
      Hello World!
    </Typography>
    <Card>
      <CardContent>
        <div style={{ display: 'flex', marginBottom: 15 }}>
          <Typography variant="h6" color="textPrimary">
            Example text.
          </Typography>
          <Typography variant="h6" color="primary">
            Hello World!
          </Typography>
        </div>

        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam harum
          cumque, facere cum sit voluptate, eaque obcaecati maiores, repellat
          libero odio! Impedit iure magnam voluptates omnis maxime? Dolorum, in
          voluptatem.
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default DashboardView;
