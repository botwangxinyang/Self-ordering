import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
//import navigation from '../navigation';
import { useLinkTo } from '@react-navigation/native';

const ShoppingCart = () => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: { open : any}) => setState({ open });

  const { open } = state;

  const linkTo = useLinkTo();
  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'arrow-left' : 'cart'}
          actions={[
            {
              icon: 'ticket-percent-outline',
              label: 'Coupons',
              onPress: () => linkTo('../screens/CouponScreen'),
            },
            {
              icon: 'cart',
              label: 'Shopping Cart',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'wallet-outline',
              label: 'Payment',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default ShoppingCart;