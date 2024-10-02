import axios from "@/axios/axios";

const state = {
  applications: [],
  currentPage: 1,
  applicationsCount: 0,
  pageSize: 10,
  totalPages: 0,
};

const mutations = {
  SET_APPLICATIONS(state, applications) {
    state.applications = applications;
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page;
  },
  SET_PAGE_SIZE(state, pageSize) {
    state.pageSize = pageSize;
  },
  SET_TOTAL_PAGES(state, totalPages) {
    state.totalPages = totalPages;
  },
  SET_APPLICATIONS_COUNT(state, applicationsCount) {
    state.applicationsCount = applicationsCount;
  },
};

const actions = {
  async fetchApplications({ commit, state }) {
    try {
      const response = await axios.get(
        `/appeals/v1.0/appeals/?page=${state.currentPage}&page_size=${state.pageSize}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );
      commit("SET_APPLICATIONS_COUNT", response.data.count);
      commit("SET_APPLICATIONS", response.data.results);
      commit("SET_TOTAL_PAGES", response.data.pages);
    } catch (error) {
      console.error("Ошибка при получении заявок:", error);
    }
  },
  setCurrentPage({ commit, dispatch }, page) {
    commit("SET_CURRENT_PAGE", page);
    dispatch("fetchApplications");
  },
  setPageSize({ commit, dispatch }, pageSize) {
    commit("SET_PAGE_SIZE", pageSize);
    dispatch("fetchApplications");
  },
};

const getters = {
  getApplications: (state) => state.applications,
  getCurrentPage: (state) => state.currentPage,
  getPageSize: (state) => state.pageSize,
  getTotalPages: (state) => state.totalPages,
  getApplicationsCount: (state) => state.applicationsCount,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
