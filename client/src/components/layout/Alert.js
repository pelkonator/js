import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from "bulma-toast";
import * as types from '../../actions/types';
import {store} from '../../store';
const Alert = props => props.alerts !== null && props.alerts.length > 0 && props.alerts.map(alert => {    
    store.dispatch({ type: types.REMOVE_ALERT, payload: alert.id });
    return toast({
        message: alert.msg,
        type: alert.alertType,
        dismissible: true,
        animate: { in: "bounceInUp", out: "fadeOut" },
        duration: alert.timeout,
        closeOnClick: true
      })
    })

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);