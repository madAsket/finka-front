import AbstractService from "@/services/AbstractService"

class AnalyticService extends AbstractService {
    async getExpensesAnalytic(projectId, filters){
        return await this.request('get', `/${projectId}/analytic/expenses/`, {params:filters});
    }
}

export default new AnalyticService(`${import.meta.env.VITE_API_URL}/projects`);