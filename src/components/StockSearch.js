import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
const StockSearch = (props) => {
	return (
		<form
			method='POST'
			onSubmit={(e) => {
				e.preventDefault();
			}}
			name='formName'
			className='center'
		>
            <Autocomplete
                id="combo-box-demo"
                options={ [
                    { ticker: 'GME', name: "GameStop" },
                    { ticker: 'PLTR', name: "Palantir Technologies" },
                    { ticker: 'CLOV', name: "Clover Health Investments" },
                    { ticker: 'FUBO', name: "Fubo TV" },
                    { ticker: 'AMC', name: "AMC Entertainment Holdings" },
                    { ticker: 'RKT', name: "Rocket Companies" },
                    { ticker: 'BB', name: "BlackBerry Limited" },
                    { ticker: 'TSLA', name: "Tesla" },
                    { ticker: 'MVIS', name: "MicroVision, Inc." },
                    { ticker: 'ASO', name: "Academy Sports and Outdoors, Inc." },
                    { ticker: 'INO', name: "Inovio Pharmaceuticals, Inc. " },
                    { ticker: 'SNDL', name: "Sundial Growers Inc." },
                    { ticker: 'AMD', name: "Advanced Micro Devices, Inc." },
                    { ticker: 'CLF', name: "Cleveland-Cliffs Inc." },
                    { ticker: 'NIO', name: "NIO Inc." },
                    { ticker: 'CRSR', name: "Corsair Gaming, Inc." },
                    { ticker: 'DAN', name: "Dana Incorporated" },
                    { ticker: 'HA', name: "Hawaiian Holdings, Inc." },
                    { ticker: 'AAPL', name: "Apple Inc." },
                    { ticker: 'KO', name: "The Coca-Cola Company" },
                    { ticker: 'SI', name: "Silvergate Capital Corporation" },
                    { ticker: 'SPCE', name: "Virgin Galactic Holdings, Inc." },
                    { ticker: 'TA', name: "TravelCenters of America Inc." },
                    { ticker: 'TLRY', name: "Tilray, Inc." },
                    { ticker: 'CIA', name: "Citizens, Inc." },
                    { ticker: 'EH', name: "EHang Holdings Limited" },
                    { ticker: 'NKLA', name: "Nikola Corporation" },
                    { ticker: 'SDC', name: "SmileDirectClub, Inc." },
                    { ticker: 'SPOT', name: "Spotify Technology S.A." },
                    { ticker: 'CC', name: "The Chemours Company" },
                    { ticker: 'FI', name: "Frank's International N.V." },
                    { ticker: 'HUYA', name: "HUYA Inc." },
                    { ticker: 'ROOT', name: "Root, Inc." },
                    { ticker: 'SVC', name: "Service Properties Trust" },
                    { ticker: 'UBER', name: "Uber Technologies, Inc." },
                    { ticker: 'AG', name: "First Majestic Silver Corp." },
                    { ticker: 'AMZN', name: "Amazon.com, Inc." },
                    { ticker: 'MSFT', name: "Microsoft Corporation" },
                    { ticker: 'JPM', name: "JPMorgan Chase & Co." },
                    { ticker: 'UPS', name: "United Parcel Service, Inc." },
                    { ticker: 'BABA', name: "Alibaba Group Holding Limited" },
                    { ticker: 'CAT', name: "Caterpillar Inc." },
                    { ticker: 'GDP', name: "Goodrich Petroleum Corporation" },
                    { ticker: 'RAMP', name: "LiveRamp Holdings, Inc." },
                    { ticker: 'WMT', name: "Walmart Inc." },
										{ ticker: 'ESP', name: "Espey Mfg. & Electronics Corp." },
										{ ticker: 'GOOGL', name: "Alphabet Inc." },
										{ ticker: 'MARA', name: "Marathon Digital Holdings, Inc." },
										{ ticker: 'XOM', name: "Exxon Mobil Corporation" },
										{ ticker: 'FCX', name: "Freeport-McMoRan Inc." },
										{ ticker: 'ASML', name: "ASML Holding N.V." },
                ]}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                renderInput={(params) =><TextField {...params} label="Top 50 Stocks" variant="outlined" />}
                onChange={(event, newValue) => {
                    props.searchValue(newValue);
                  }}
            />
		</form>
	);
};

export default StockSearch;
