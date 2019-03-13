import {connect} from "react-redux";
import {IAppState} from "../../store/store";
import React from "react";

class DefaultPage extends React.Component {
    public render(): JSX.Element {
        return (
            <div>Hello world!</div>
        );
    }
}

export default connect((state: IAppState): any => {
	return {
		//
	};
})(DefaultPage);
