const monitoring = require("../models/monitoring");
const MonitoringModel = new monitoring();

class MonitoringService {
    async getMonitoringInfo(data) {
        return await MonitoringModel.getMonitoringInfo(data);
    }
    // 기상정보
    async getWeather(user_powerplant) {
        return await MonitoringModel.getWeater(user_powerplant);
    }

}

module.exports = MonitoringService;