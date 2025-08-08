import { ExtHostTesting, IExtHostTesting } from './extHostTesting.js';
import { ExtHostUrls, IExtHostUrlsService } from './extHostUrls.js';registerSingleton(IExtHostEditorTabs, ExtHostEditorTabs, InstantiationType.Eager);
registerSingleton(IExtHostVariableResolverProvider, ExtHostVariableResolverProviderService, InstantiationType.Eager);
registerSingleton(IExtHostDataChannels, ExtHostDataChannels, InstantiationType.Eager);import { ExtHostTesting, IExtHostTesting } from './extHostTesting.js';
import { ExtHostUrls, IExtHostUrlsService } from './extHostUrls.js';registerSingleton(IExtHostEditorTabs, ExtHostEditorTabs, InstantiationType.Eager);
registerSingleton(IExtHostVariableResolverProvider, ExtHostVariableResolverProviderService, InstantiationType.Eager);
registerSingleton(IExtHostDataChannels, ExtHostDataChannels, InstantiationType.Eager);