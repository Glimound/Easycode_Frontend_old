import store from "@/store";

export default function exportSchema() {
    return JSON.stringify(store.state.layoutList);
}