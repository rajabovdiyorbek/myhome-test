<template>
  <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-title">
          {{
            localApplicationData.id
              ? `Заявка № ${localApplicationData.number} (от ${formatDate(
                  localApplicationData.created_at
                )})`
              : "Создание заявки"
          }}
        </div>
        <div class="header-status">
          {{
            localApplicationData.status?.name
              ? localApplicationData.status?.name
              : "Новая"
          }}
        </div>
      </div>
      <div class="modal-body">
        <div class="fields">
          <div class="field-select">
            <select v-model="localApplicationData.premise_id">
              <option
                v-for="premise in getPremises"
                :key="premise.id"
                :value="premise.id"
              >
                {{ premise.address }}
              </option>
            </select>
            <label class="label" for="home">Дом</label>
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
          <div class="field-select">
            <select v-model="localApplicationData.apartment_id">
              <option
                v-for="apartament in getApartaments"
                :key="apartament.id"
                :value="apartament.id"
              >
                {{ apartament.label }}
              </option>
            </select>
            <label class="label" for="kv">Квартира</label>
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
          <div class="field-input">
            <input
              type="date"
              id="srok"
              v-model="localApplicationData.due_date"
              placeholder="Срок"
            />
            <label class="label" for="srok">Срок</label>
          </div>
        </div>
        <div class="fields">
          <div class="field-input">
            <input
              type="text"
              v-model="localApplicationData.applicant.last_name"
              placeholder="Фамилия"
            />
            <label class="label">Фамилия</label>
          </div>
          <div class="field-input">
            <input
              type="text"
              v-model="localApplicationData.applicant.first_name"
              placeholder="Имя"
            />
            <label class="label">Имя</label>
          </div>
          <div class="field-input">
            <input
              type="text"
              v-model="localApplicationData.applicant.patronymic_name"
              placeholder="Отчество"
            />
            <label class="label">Отчество</label>
          </div>
          <div class="field-input">
            <input
              type="text"
              v-model="localApplicationData.applicant.username"
              placeholder="Телефон"
            />
            <label class="label">Телефон</label>
          </div>
        </div>
        <div class="fields">
          <div class="field-textarea">
            <textarea
              v-model="localApplicationData.description"
              placeholder="Описание заявки"
            ></textarea>
            <label class="label">Описание заявки</label>
          </div>
        </div>
        <div class="fields">
          <div class="btn" @click="submitApplication">
            {{ localApplicationData.id ? "Сохранить" : "Создать" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppModal",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    applicationData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      localApplicationData: {
        id: null,
        status: null,
        due_date: "",
        premise_id: null,
        apartment_id: null,
        description: "",
        applicant: {
          last_name: "",
          first_name: "",
          patronymic_name: "",
          username: "",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      getPremises: "applications/getPremises",
      getApartaments: "applications/getApartaments",
    }),
  },
  methods: {
    ...mapActions({
      updateApplication: "applications/updateApplication",
      createApplication: "applications/createApplication",
    }),
    closeModal() {
      this.$emit("close");
    },
    resetLocalApplicationData() {
      this.localApplicationData = {
        id: null,
        status: null,
        due_date: "",
        premise_id: null,
        apartment_id: null,
        description: "",
        applicant: {
          last_name: "",
          first_name: "",
          patronymic_name: "",
          username: "",
        },
      };
    },
    openModal() {
      if (this.applicationData && this.applicationData.id) {
        // Если данные переданы, копируем их в локальное состояние для редактирования
        this.localApplicationData = { ...this.applicationData };
      } else {
        // Если это новая заявка, сбрасываем состояние
        this.resetLocalApplicationData();
      }
    },
    submitApplication() {
      // Проверка и форматирование даты
      if (this.localApplicationData.due_date) {
        const date = new Date(this.localApplicationData.due_date);
        this.localApplicationData.due_date = date.toISOString();
      }

      if (this.localApplicationData.id) {
        this.updateApplication(this.localApplicationData);
      } else {
        this.localApplicationData.id = this.generateUUID();
        this.localApplicationData.status_id = 0;

        this.createApplication(this.localApplicationData);
      }
      this.closeModal();
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
    generateUUID() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        this.openModal();
      } else {
        this.resetLocalApplicationData();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  display: flex;
  flex-direction: column;
  background: white;
  width: 680px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 24px 32px;
  gap: 24px;

  .modal-header {
    display: flex;
    justify-content: space-between;
    .header-title {
      font-size: 16px;
      font-weight: 500;
    }
    .header-status {
      font-size: 14px;
      font-weight: 400;
    }
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .fields {
      display: flex;
      gap: 14px;
      justify-content: end;
      .btn {
        width: 46px;
        background-color: #4caf50;
        font-size: 10px;
        color: white;
        padding: 10px 16px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .field-input,
      .field-select {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        margin-right: 15px;
      }

      .field-textarea {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
        margin-right: 15px;
      }

      .field-input input,
      .field-select input,
      .field-textarea textarea {
        position: relative;
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
      }
      .label {
        position: absolute;
        color: #ababab;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 1;
      }

      .field-textarea textarea {
        min-width: 650px;
        height: 98px;
        resize: none;
      }

      .field-textarea label {
        top: 10px;
        z-index: 1;
      }
    }
  }
}
input {
  padding-left: 0px !important;
}
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
select:focus + label,
select:not(:placeholder-shown) + label,
textarea:focus + label,
textarea:not(:placeholder-shown) + label,
input:focus + label,
input:not(:placeholder-shown) + label {
  color: #4caf50 !important;
  transform: translateY(-20px);
  font-size: 12px;
}

textarea::placeholder,
input::placeholder {
  color: white;
}
</style>
