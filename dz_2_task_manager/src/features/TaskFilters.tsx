import { useSelector, useDispatch } from "react-redux";

import { categories, statuses, priorities, defaultFilters } from "@/entities/model/tasks";
import { selectFilters, setFilters } from "@features/taskSlice";

import styles from "./TaskFilters.module.css";
import global from "@app/App.module.css";

import ClearIcon from "@mui/icons-material/Clear";

import type { Filters } from "@/entities/model/tasks";

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
          <label className={styles.label}>Сортировать по</label>
          <select
            className={styles.select}
            value={filters.sortBy || "createdAt"}
            onChange={(e) => handleChange("sortBy", e.target.value)}
          >
            <option value="createdAt">Дате создания</option>
            <option value="title">Заголовку</option>
            <option value="category">Категории</option>
            <option value="status">Статусу</option>
            <option value="priority">Приоритету</option>
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Порядок</label>
          <select
            className={styles.select}
            value={filters.sortOrder || "asc"}
            onChange={(e) => handleChange("sortOrder", e.target.value)}
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
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
          <label className={styles.label}>Категория</label>
          <select
            className={styles.select}
            value={filters.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <option className={styles.option} value="All">
              -
            </option>
            {categories.map((c) => (
              <option className={styles.option} key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Статус</label>
          <select
            className={styles.select}
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
          >
            <option className={styles.option} value="All">
              -
            </option>
            {statuses.map((s) => (
              <option className={styles.option} key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label className={styles.label}>Приоритет</label>
          <select
            className={styles.select}
            value={filters.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
          >
            <option className={styles.option} value="All">
              -
            </option>
            {priorities.map((p) => (
              <option className={styles.option} key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
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
