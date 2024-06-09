import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  CallWithChatComposite,
  useAzureCommunicationCallWithChatAdapter
} from '@azure/communication-react';
import { Spinner, initializeIcons } from '@fluentui/react';
import React, { useMemo } from 'react';

initializeIcons();

export const CallWithChatExperience = (props) => {
  const credential = useMemo(() => new AzureCommunicationTokenCredential(props.token), [props.token]);

  const adapter = useAzureCommunicationCallWithChatAdapter({
    userId: props.userId,
    displayName: props.displayName,
    credential,
    locator: props.locator,
    endpoint: props.endpointUrl
  });

  if (!adapter) {
    return <Spinner label="Initializing..." />;
  }

  return (
    <CallWithChatComposite
      adapter={adapter}
      fluentTheme={props.fluentTheme}
      rtl={props.rtl}
      formFactor={props.formFactor}
      joinInvitationURL={props.callInvitationURL}
      options={props.compositeOptions}
    />
  );
};
