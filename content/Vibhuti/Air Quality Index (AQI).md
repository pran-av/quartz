---
date: 2025-02-04
---
AQI is the measure of air quality. Air has multiple pollutants like Particulate Matter (PM2.5 and PM10), Carbon Monoxide, Sulphur Dioxide, Nitrogen Dioxide and Ozone - the concentrations for each of these pollutants are measured individually and then the 'Individual' AQI is calculated by interpolation, the worst (highest) of the 'Individual' AQI is considered as the common AQI.

Based on pollutants, the measurement value is determined over a period of time - like PM2.5 concentration is $75μg/m^3$, which is average over a period of 24 hours. With countries, these measurement techniques might change. In India a **minimum 16 hours of monitoring** is necessary for each pollutant type.

Also, **two cities having the same AQI does not mean there is same risk**. The Prominent pollutant is mentioned against each measurement, in the screenshot below we can see PM10 is the prominent pollutant. The types of air filters we use will also change based on the prominent pollutant of that locality.

![[PollutantsOverTime.png|700]]

References:
1. [CPCB - How AQI Calculated](http://app.cpcbccr.com/ccr_docs/How_AQI_Calculated.pdf)
2. [National AQI Monitor](http://app.cpcbccr.com/AQI_India/)

>[!question] ### Do you wish to get a weekly summary of all my explorations?
>
>##### [subscribe to my email list](http://eepurl.com/i8vmEk)
## How is AQI Calculated?

An interpolation is done with the health breakpoint concentration ranges to get the AQI. Below is a example table referenced through a document related to [US agency](https://web.archive.org/web/20201026120832/https://www.airnow.gov/sites/default/files/2018-05/aqi-technical-assistance-document-may2016.pdf) The health breakpoints are subjective to the impact of pollutants on the resident population - and hence such breakpoints might differ with countries.

**Step 1:** Identify the average concentration among all the pollutants across a standard period of time - 24 hours for PM, 8 hours for Ozone, 1 or 6 hours for all other pollutants.

The hourly frequency of measurement can change based on the situations. Like a forest fire will have rapidly deteriorating AQI, requiring frequent intervals.

| Pollutant        | Truncation**                 |
| ---------------- | ---------------------------- |
| Ozone ($ppm$)    | truncate to 3 decimal places |
| PM2.5 ($µg/m^3$) | truncate to 1 decimal place  |
| PM10 ($µg/m^3$)  | truncate to integer          |
| CO ($ppm$)       | truncate to 1 decimal place  |
| $SO_2$ ($ppb$)   | truncate to integer          |
| $NO_2$ ($ppb$)   | truncate to integer          |
| $NH_3$           | (additional for India)       |
| Pb               | (additional for India)       |
** as per US EPA Standards

**Step 2:** Identify the average concentration ($C$) for each pollutant and use the related benchmark to identify the $C_h$ (high concentration), $C_l$ (low concentration), $I_h$ (high AQI), $I_l$ (low AQI).

$C$ must lie between one of these ranges.

Following are the breakpoint ranges,
![[AQIBenchmarking.png|650]]

**Step 3:** Use the following piecewise linear interpolation formula to get a AQI value.

>$AQI = [(I_h - I_l)/(C_h - C_l)] × (C - C_l) + I_l$

**Formula visualisation:** We are dividing AQI range and Concentration range as per health breakpoints. So this gives us AQI per micro gram or ppm or bpm of concentration. Then we multiple by the change in lowest breakpoint and the average concentration to get a delta $AQI_d$ and then add it to the lowest AQI as per breakpoint.

**Step 4:** Round the AQI to nearest integer

## How do we measure AQI every $100m^2$?

India has 731 stations across 312 cities as of 2019. Its impractical to measure on meter square basis with physical stations. However we can use other technologies,
1. **Remote Sensing Satellites:** India does not have any air quality specific satellite missions or private satellites. ESA's Sentinel-5P provides 1 km² resolution for $NO_2$ and aerosols. Limitations are that PM2.5 measurement requires ground calibrations.
2. **IoT Devices:** For instance PurpleAir sensors can be purchased by individuals where each sensor can act as an individual station. Limitation: Needs work to ensure each device is calibrated with local stations.
	![[PurpleAirAQI.png|600]]
3. **Hybrid Methods:** Google Maps Air Quality Index APIs provide $500m^2$ resolution using Machine Learning techniques over available ground based data. 

If we have to measure AQI for every $100m^2$ in major cities - seems like IoT Devices are the best options. Maybe each society can be mandated to have equipment installed or vehicles can be fitted with such devices (being mobile might make things complicated).

Or maybe we need to develop low cost AQI measurement devices everyone can afford, and connect them with internet for syncing. A Theranos for Air Quality - but actually works.

Further Machine Learning models should use this data to forecast AQI so that we can take actions on vehicular traffic, stubble burning, construction activities in regions based on the forecast. Wind direction, speed, ventilation all these factors will matter as well.

