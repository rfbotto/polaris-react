import React from 'react';
import {unstyled} from '../shared';
import {usePolaris} from '../../utilities/use-polaris';
import {UnstyledLinkProps} from '../../utilities/unstyled-link';

// Every components needs a `Props` interface
// for our styleguide to build the props explorer
interface Props extends UnstyledLinkProps {}

export default React.memo(function UnstyledLink(props: Props) {
  const {link} = usePolaris();
  if (link) {
    const LinkComponent = link.getLinkComponent();
    if (LinkComponent) {
      return <LinkComponent {...unstyled.props} {...props} />;
    }
  }

  const {external, url, ...rest} = props;
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;
  return (
    <a target={target} {...rest} href={url} rel={rel} {...unstyled.props} />
  );
});
