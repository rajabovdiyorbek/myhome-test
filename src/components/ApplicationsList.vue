<template>
  <div class="applications-wrapper">
    <div class="applications-title">Список заявок</div>
    <div class="applications-table">
      <div class="table-create">
        <div class="btn" @click="showCreateModal">СОЗДАТЬ</div>
      </div>
      <div class="table-filters">
        <div class="filters-search">
          <input
            type="text"
            v-model="searchQuery"
            @input="updateSearch"
            placeholder="Поиск (№ заявки, название)"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <mask
              id="mask0_4022_45"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_4022_45)">
              <path
                d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                fill="#999999"
              />
            </g>
          </svg>
        </div>
        <div class="filters-select">
          <select
            placeholder="Дом"
            v-model="selectedPremiseId"
            @change="updatePremise"
          >
            <option
              v-for="premise in getPremises"
              :key="premise.id"
              :value="premise.id"
            >
              {{ premise.address }}
            </option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <mask
              id="mask0_4022_74"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_4022_74)">
              <path
                d="M12 15.3751L6 9.37509H7.4H12L16.6 9.37543L18 9.37509L12 15.3751Z"
                fill="#999999"
              />
            </g>
          </svg>
        </div>
      </div>
      <div class="table-content">
        <div class="content-row">
          <div class="row-info">№</div>
          <div class="row-info">Создана</div>
          <div class="row-info">Адрес</div>
          <div class="row-info">Заявитель</div>
          <div class="row-info">Описание</div>
          <div class="row-info">Срок</div>
          <div class="row-info">Статус</div>
        </div>
        <div
          class="content-row"
          v-for="application in getApplications"
          :key="application.id"
          @click="showEditModal(application)"
        >
          <div class="row-number">
            <span>{{ application.number }}</span>
          </div>
          <div class="row-created">
            {{ formatDate(application.created_at) }}
          </div>
          <div class="row-address">
            {{ application.premise?.address ?? "Лесная, 10, кв. 5" }}
          </div>
          <div class="row-autor">
            {{
              application.applicant.first_name
                ? application.applicant.first_name
                : "Забавкин А.П."
            }}
          </div>
          <div class="row-description">
            {{
              application.description
                ? application.description
                : " Подкрасить царапины на стенах в гостиной."
            }}
          </div>
          <div class="row-date">{{ formatDate(application.due_date) }}</div>
          <div class="row-status">{{ application.status.name }}</div>
        </div>
      </div>
      <AppPagination
        :currentPage="getCurrentPage"
        :totalPages="getTotalPages"
        :pageSize="getPageSize"
        :pageCount="getApplicationsCount"
        @update:currentPage="setCurrentPage"
        @update:pageSize="setPageSize"
      />
      <AppModal
        :applicationData="modalApplicationData"
        :isVisible="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppModal from "./AppModal.vue";
import AppPagination from "./AppPagination.vue";
export default {
  name: "ApplicationsList",
  data() {
    return {
      currentPage: 1,
      totalPages: 12,
      showModal: false,
      selectedPremiseId: "",
      searchQuery: "",
      modalApplicationData: null,
    };
  },
  components: {
    AppPagination,
    AppModal,
  },
  computed: {
    ...mapGetters({
      getApplications: "applications/getApplications",
      getCurrentPage: "applications/getCurrentPage",
      getApplicationsCount: "applications/getApplicationsCount",
      getPageSize: "applications/getPageSize",
      getTotalPages: "applications/getTotalPages",
      getPremises: "applications/getPremises",
      getSearchQuery: "applications/getSearchQuery",
    }),
  },
  methods: {
    ...mapActions({
      fetchApplications: "applications/fetchApplications",
      fetchPremises: "applications/fetchPremises",
      setCurrentPage: "applications/setCurrentPage",
      setPageSize: "applications/setPageSize",
      setPremiseId: "applications/setPremiseId",
      setSearchQuery: "applications/setSearchQuery",
      fetchApartaments: "applications/fetchApartaments",
    }),
    formatDate(dateString) {
      const date = new Date(dateString);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}.${month}.${year}`;
    },
    updatePremise() {
      this.setPremiseId(this.selectedPremiseId);
    },
    updateSearch() {
      this.setSearchQuery(this.searchQuery);
    },
    showCreateModal() {
      this.modalApplicationData = null; // Очищаем данные для создания новой заявки
      this.showModal = true;
    },
    showEditModal(application) {
      this.modalApplicationData = application; // Передаем данные для редактирования
      this.showModal = true;
    },
  },
  async mounted() {
    await this.fetchPremises();
    await this.fetchApartaments("58154706-c96d-40e4-abf2-2b5693b0909f");

    await this.fetchApplications();
  },
  watch: {
    currentPage: "fetchApplications",
    pageSize: "fetchApplications",
  },
};
</script>
<style lang="scss" scoped>
.applications-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}

.applications-title {
  font-size: 20px;
  margin-bottom: 20px;
  margin-left: 32px;
}

.applications-table {
  max-width: 1210px;
  margin: auto;
  border: none;
  border-radius: 8px;
  padding: 20px;
  background: #fff;
}

.table-create {
  display: flex;
  justify-content: end;
  text-align: right;
  margin-bottom: 32px;
}

.table-create .btn {
  width: 46px;
  background-color: #4caf50;
  font-size: 10px;
  color: white;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table-create .btn:hover {
  background-color: #45a049;
}

.table-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}
.filters-search,
.filters-select {
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  margin-right: 15px;
  select {
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: "";
  }
}
.filters-search input,
.filters-select input {
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
}

.filters-search svg,
.filters-select svg {
  margin-left: -35px;
  cursor: pointer;
}

.table-content {
  width: 100%;
  display: table;
}

.content-row {
  display: table-row;
  background-color: white;
  border-bottom: 1px solid #e0e0e0;
  transition: background-color 0.2s;
}

.content-row:hover {
  background-color: #f5f5f5;
}

.row-info {
  display: table-cell;
  font-size: 14px;
  padding: 15px;
  color: #50b053;
  text-align: left;
}

.row-number,
.row-created,
.row-address,
.row-autor,
.row-description,
.row-date,
.row-status {
  cursor: pointer;
  font-size: 14px;
  display: table-cell;
  padding: 15px;
  text-align: left;
  color: #333;
  border-bottom: 1px solid #e0e0e0;
}
.row-number {
  padding: 15px 4px;
}
.row-number span {
  display: block;
  width: 27px;
  padding: 4px 16px;
  background-color: #4caf50;
  border-radius: 4px;
  color: white;
}
.row-status.new {
  color: #4caf50;
}

.row-status.completed {
  color: #9e9e9e;
}

@media screen and (max-width: 768px) {
  .applications-wrapper {
    padding: 10px;
  }

  .filters-search input,
  .filters-select input {
    width: 100%;
  }

  .content-row {
    display: block;
    margin-bottom: 10px;
  }

  .row-info,
  .row-number,
  .row-created,
  .row-address,
  .row-autor,
  .row-description,
  .row-date,
  .row-status {
    display: block;
    width: 100%;
    padding: 10px 0;
    text-align: left;
    border-bottom: none;
  }
}
</style>
