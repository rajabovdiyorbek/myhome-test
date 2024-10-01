<template>
  <div class="table-pagination">
    <div class="pagination-size">
      <div class="size-count">
        <span>1–10</span> из <span>1500</span> записей
      </div>
      <div class="size-select">
        <input type="text" placeholder="10" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <mask
            id="mask0_4026_809"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="24"
            height="24"
          >
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_4026_809)">
            <path
              d="M12 15.3751L6 9.37512H7.4H12L16.6 9.37546L18 9.37512L12 15.3751Z"
              fill="#999999"
            />
          </g>
        </svg>
      </div>
    </div>
    <div class="pagination-page">
      <div class="double-left" @click="changePage(1)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <mask
            id="mask0_4026_820"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="14"
            height="14"
          >
            <rect width="14" height="14" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_4026_820)">
            <path
              d="M6.41669 10.5L2.91669 7L6.41669 3.5L7.23335 4.31667L4.5646 7L7.23335 9.68333L6.41669 10.5ZM10.2667 10.5L6.76669 7L10.2667 3.5L11.0834 4.31667L8.4146 7L11.0834 9.68333L10.2667 10.5Z"
              fill="#6C757D"
            />
          </g>
        </svg>
      </div>
      <div
        class="left"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <mask
            id="mask0_4026_827"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="14"
            height="14"
          >
            <rect width="14" height="14" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_4026_827)">
            <path
              d="M8.16669 10.5L4.66669 7L8.16669 3.5L8.98335 4.31667L6.30002 7L8.98335 9.68333L8.16669 10.5Z"
              fill="#6C757D"
            />
          </g>
        </svg>
      </div>

      <div
        class="page"
        :class="{ active: currentPage === 1 }"
        @click="changePage(1)"
      >
        1
      </div>

      <div v-if="showLeftDots" class="page dots">...</div>

      <div
        v-for="page in visiblePages"
        :key="page"
        class="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </div>

      <div v-if="showRightDots" class="page dots">...</div>

      <div
        class="page"
        :class="{ active: currentPage === totalPages }"
        @click="changePage(totalPages)"
      >
        {{ totalPages }}
      </div>

      <div
        class="right"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <mask
            id="mask0_4026_862"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="16"
            height="16"
          >
            <rect width="16" height="16" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_4026_862)">
            <path
              d="M8.40004 8L5.33337 4.93333L6.26671 4L10.2667 8L6.26671 12L5.33337 11.0667L8.40004 8Z"
              fill="#6C757D"
            />
          </g>
        </svg>
      </div>
      <div class="double-right" @click="changePage(totalPages)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <mask
            id="mask0_4026_869"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="16"
            height="16"
          >
            <rect width="16" height="16" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_4026_869)">
            <path
              d="M6.38337 8L3.33337 4.93333L4.26671 4L8.26671 8L4.26671 12L3.33337 11.0667L6.38337 8ZM10.7834 8L7.73337 4.93333L8.66671 4L12.6667 8L8.66671 12L7.73337 11.0667L10.7834 8Z"
              fill="#6C757D"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ThePagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    visiblePages() {
      const pages = [];

      if (this.totalPages <= 7) {
        for (let i = 2; i < this.totalPages; i++) {
          pages.push(i);
        }
      } else if (this.currentPage <= 4) {
        pages.push(2, 3, 4, 5);
      } else if (this.currentPage >= this.totalPages - 3) {
        pages.push(
          this.totalPages - 4,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1
        );
      } else {
        pages.push(
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1
        );
      }

      return pages;
    },
    showLeftDots() {
      return this.currentPage > 4;
    },
    showRightDots() {
      return this.currentPage < this.totalPages - 3;
    },
  },
  methods: {
    changePage(page) {
      if (page !== this.currentPage) {
        this.$emit("update:currentPage", page);
      }
    },
    goToFirstPage() {
      this.changePage(1);
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1);
      }
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1);
      }
    },
    goToLastPage() {
      this.changePage(this.totalPages);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 32px;

  .pagination-size {
    display: flex;
    align-items: center;
    gap: 16px;

    .size-count {
      font-size: 14px;

      span {
        font-weight: 700;
      }
    }
    .size-select {
      width: 89px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;

      input {
        width: 100%;
        padding: 10px;
        border: none;
        outline: none;
      }
    }
  }
  .pagination-page {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;

    .double-left,
    .left,
    .right,
    .double-right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #f0f0f0;
      }

      svg {
        width: 12px;
        height: 12px;
        fill: #6c757d;
      }
    }

    .page {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 10px;
      gap: 4px;
      cursor: pointer;
      color: #6c757d;
      transition: background-color 0.3s, color 0.3s;

      &.active {
        background-color: #28a745;
        color: white;
      }

      &:hover {
        background-color: #f0f0f0;
      }
    }

    .dots {
      cursor: default;
      &:hover {
        background-color: #fff;
      }
    }
  }
}
</style>
