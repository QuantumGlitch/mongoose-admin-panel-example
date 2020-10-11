// Register new components or override existing ones
import Grid from './components/Grid';

import { registeredComponents } from 'mongoose-admin-panel-frontend/lib/core/ComponentRenderer';

// Override default Grid component
registeredComponents['Grid'] = Grid;
