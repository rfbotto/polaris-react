import React from 'react';

import {Popover, Button} from 'components';
import {mountWithAppProvider} from 'test-utilities';

import ConnectedFilterControl, {
  PopoverableAction,
} from '../ConnectedFilterControl';

const MockChild = () => <div />;
const MockFilter = () => <div />;
const MockAux = () => <div />;

const mockRightOpenPopoverableAction: PopoverableAction = {
  popoverOpen: true,
  popoverContent: MockFilter,
  key: 'openAction',
  content: 'Open action',
  onAction: noop,
};

const mockRightClosedPopoverableAction: PopoverableAction = {
  popoverOpen: false,
  popoverContent: MockFilter,
  key: 'closedAction',
  content: 'Closed action',
  onAction: noop,
};

const mockRightAction = <Button onClick={noop}>Right Action</Button>;

describe('<ConnectedFilterControl />', () => {
  it('mounts', () => {
    expect(() => {
      mountWithAppProvider(
        <ConnectedFilterControl>
          <MockChild />
        </ConnectedFilterControl>,
      );
    }).not.toThrow();
  });

  it('does not render buttons without right actions or right popoverable actions', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button).exists()).toBe(false);
  });

  it('does not render popovers without right popoverable actions', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Popover).exists()).toBe(false);
  });

  it('does render a button with a right action', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl rightAction={mockRightAction}>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button).exists()).toBe(true);
  });

  it('does render a button with a popoverable action', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightPopoverableActions={[mockRightOpenPopoverableAction]}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button)).toHaveLength(1);
  });

  it('renders three buttons with two popoverable actions and a right action', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl
        rightPopoverableActions={[
          mockRightOpenPopoverableAction,
          mockRightClosedPopoverableAction,
        ]}
        rightAction={mockRightAction}
      >
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(Button)).toHaveLength(3);
  });

  it('renders auxiliary content', () => {
    const connectedFilterControl = mountWithAppProvider(
      <ConnectedFilterControl auxiliary={<MockAux />}>
        <MockChild />
      </ConnectedFilterControl>,
    );

    expect(connectedFilterControl.find(MockAux).exists()).toBe(true);
  });
});

function noop() {}
