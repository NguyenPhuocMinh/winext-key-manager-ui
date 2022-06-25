import { BootStrapStory, BootStrapStoryResource } from 'story-bootstrap';
// provider
import authProvider from './authProvider/authProvider';
import i18nProvider from './i18nProvider';
import customReducers from './customStore/customReducers';
import resources from './resources';
import { Dashboard, LoginPage } from './components';
import { Layout } from './layout';

const App = () => {
  return (
    <BootStrapStory
      title="title" // see translate title
      authProvider={authProvider}
      customReducers={customReducers}
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
      loginPage={LoginPage}
      layout={Layout}
    >
      {resources.map((resource) => (
        <BootStrapStoryResource
          key={resource.name}
          name={resource.name}
          component={resource.component}
        />
      ))}
    </BootStrapStory>
  );
};

export default App;
