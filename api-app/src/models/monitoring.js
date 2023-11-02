const { transactionQuery, query } = require("../loaders/db");

class MonitoringModel {
    async getMonitoringInfo(data){
        return await transactionQuery("select 1 union select 2","");
    }

    // 기상청
    async getWeater(userPowerplant){
        return await transactionQuery(
            `select * from weather_info where mod_dttm is not null AND solarpower_sn=? order by mod_dttm DESC limit 1`
            ,userPowerplant
        )
    }
}

module.exports = MonitoringModel;