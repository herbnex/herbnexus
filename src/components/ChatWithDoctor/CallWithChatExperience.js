import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import {
  CallWithChatComposite,
  useAzureCommunicationCallWithChatAdapter
} from '@azure/communication-react';
import { Spinner, initializeIcons } from '@fluentui/react';
import React, { useMemo } from 'react';

initializeIcons();

export const CallWithChatExperience = (props) => {
  const credential = useMemo(() => {
    console.log("Initializing AzureCommunicationTokenCredential with token:", props.token);
    return new AzureCommunicationTokenCredential(props.token);
  }, [props.token]);

  const adapter = useAzureCommunicationCallWithChatAdapter({
    userId: props.userId,
    displayName: props.displayName,
    credential,
    locator: props.locator,
    endpoint: props.endpointUrl
  });

  if (!adapter) {
    console.log("Adapter not initialized yet");
    return <Spinner label="Initializing..." />;
  }

  console.log("Adapter initialized successfully");

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
