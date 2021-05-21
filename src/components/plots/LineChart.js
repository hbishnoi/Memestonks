import React,{Fragment} from 'react';
import PropTypes from 'prop-types'
import Plot from 'react-plotly.js';

const LineChart = ({financialItem,financialItemName,color, duration}) => {
    return (
        <div>
            <h1> {duration} </h1>
        <Fragment>
            <Plot
                data={[
                    {
                        x: financialItem.financialChartXValues,
                        y: financialItem.financialChartCloseValues,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: color},
                    }
                ]}
                layout={{width: 720, height: 440, title: financialItemName}}
                options ={ {displaylogo: 'false'} }
            />
        </Fragment>
        </div>
    );
};

LineChart.propTypes = {
    financialItemName: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
}

export default LineChart;