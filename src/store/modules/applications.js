import axios from "@/axios/axios";

const state = {
  applications: [],
  currentPage: 1,
  applicationsCount: 0,
  pageSize: 10,
  totalPages: 0,
  searchQuery: "",
  premiseId: "",
  premises: [],
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
  SET_SEARCH_QUERY(state, query) {
    state.searchQuery = query;
  },
  SET_PREMISE_ID(state, premiseId) {
    state.premiseId = premiseId;
  },
  SET_PREMISES(state, premises) {
    state.premises = premises;
  },
};

const actions = {
  // Existing actions
  async fetchApplications({ commit, state }) {
    try {
      const response = await axios.get(
        `/appeals/v1.0/appeals/?page=${state.currentPage}&page_size=${state.pageSize}&search=${state.searchQuery}&premise_id=${state.premiseId}`,
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

  async fetchPremises({ commit }) {
    try {
      const response = await axios.get(
        "https://dev.moydomonline.ru/api/geo/v2.0/user-premises/",
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(response.data.results);
      commit("SET_PREMISES", response.data.results); // Adjust based on the API response structure
    } catch (error) {
      console.error("Ошибка при получении помещений:", error);
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
  setSearchQuery({ commit, dispatch }, query) {
    commit("SET_SEARCH_QUERY", query);
    commit("SET_CURRENT_PAGE", 1);
    dispatch("fetchApplications");
  },
  setPremiseId({ commit, dispatch }, premiseId) {
    commit("SET_PREMISE_ID", premiseId);
    commit("SET_CURRENT_PAGE", 1);
    dispatch("fetchApplications");
  },
};

const getters = {
  getApplications: (state) => state.applications,
  getCurrentPage: (state) => state.currentPage,
  getPageSize: (state) => state.pageSize,
  getTotalPages: (state) => state.totalPages,
  getApplicationsCount: (state) => state.applicationsCount,
  getSearchQuery: (state) => state.searchQuery,
  getPremiseId: (state) => state.premiseId,
  getPremises: (state) => state.premises,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
