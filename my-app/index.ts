import { registerRootComponent } from 'expo';

import App from './App';
import YouTubeHome from './screens/Youtube';
import CalPropinas from './screens/CalPropinas';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(CalPropinas);
