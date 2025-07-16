import { useSelector, useDispatch } from "react-redux";

import { categories, statuses, priorities, defaultFilters } from "@/entities/model/tasks";
import { selectFilters, setFilters } from "@features/taskSlice";

import styles from "./TaskFilters.module.css";
import global from "@app/App.module.css";

import ClearIcon from "@mui/icons-material/Clear";

import type { Filters } from "@/entities/model/tasks";
import CustomSelect from "@/shared/CustomSelect";

export default function TaskFilters() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const handleChange = (
    key: keyof Filters,
    value: string,
  ) => {
    dispatch(setFilters({ ...filters, [key]: value }));
  };

  const handleClear = () => {
    dispatch(setFilters(defaultFilters));
  };

  return (
    <div className={styles.card}>
      <div className={styles.sorting_container}>
        <div style={{ flex: 1 }}>
          <CustomSelect
            label="Сортировать по"
            options={[
              { value: "createdAt", label: "Дате создания" },
              { value: "title", label: "Заголовку" },
              { value: "category", label: "Категории" },
              { value: "status", label: "Статусу" },
              { value: "priority", label: "Приоритету" },
            ]}
            value={filters.sortBy || "createdAt"}
            onChange={(v) => handleChange("sortBy", v)}
            className={styles.select}
          />
        </div>
        <div style={{ flex: 1 }}>
          <CustomSelect
            label="Порядок"
            options={[
              { value: "asc", label: "По возрастанию" },
              { value: "desc", label: "По убыванию" },
            ]}
            value={filters.sortOrder || "asc"}
            onChange={(v) => handleChange("sortOrder", v)}
            className={styles.select}
          />
        </div>
      </div>
      
      <form className={styles.stack}>
        <div className={styles.delfilter}>
          <button type="button" className={global.custom_button} onClick={handleClear}>
            <ClearIcon className={styles.delfilter_text} fontSize="small" />{" "}
            Очистить
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <CustomSelect
            label="Категория"
            options={[
              { value: "All", label: "-" },
              ...categories.map((c) => ({ value: c, label: c })),
            ]}
            value={filters.category}
            onChange={(v) => handleChange("category", v)}
            className={styles.select}
          />
        </div>
        <div style={{ flex: 1 }}>
          <CustomSelect
            label="Статус"
            options={[
              { value: "All", label: "-" },
              ...statuses.map((s) => ({ value: s, label: s })),
            ]}
            value={filters.status}
            onChange={(v) => handleChange("status", v)}
            className={styles.select}
          />
        </div>
        <div style={{ flex: 1 }}>
          <CustomSelect
            label="Приоритет"
            options={[
              { value: "All", label: "-" },
              ...priorities.map((p) => ({ value: p, label: p })),
            ]}
            value={filters.priority}
            onChange={(v) => handleChange("priority", v)}
            className={styles.select}
          />
        </div>
        {/* Фильтр по дате создания, но это не требуется в задании */}
        {/* <div style={{ flex: 1 }}>
          <label className={styles.label}>Дата от</label>
          <input
            className={styles.select}
            type="date"
            value={filters.createdFrom || ""}
            onChange={(e) => handleChange("createdFrom", e.target.value)}
          />
        </div> */}
      </form>
    </div>
  );
}
