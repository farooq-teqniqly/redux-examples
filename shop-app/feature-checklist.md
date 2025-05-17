# ✅ Feature Development Checklist (Redux Toolkit + Saga + React Query)

## 1. Create the Slice (`featureNameSlice.js`)

- [ ] Define `initialState` with flags like `loading`, `data`, `error`
- [ ] Create Redux actions:
  - [ ] `fetchFeatureEntitiesRequest`
  - [ ] `fetchFeatureEntitiesSuccess`
  - [ ] `fetchFeatureEntitiesFailure`
- [ ] Export actions and the reducer
- [ ] Add the reducer to `store.js`

---

## 2. Create the Saga (`featureNameSaga.js`)

- [ ] Define **worker saga** functions like:
  - `fetchFeatureEntitiesSaga`
  - `createFeatureEntitySaga`
- [ ] Define a **watcher saga** named:
  - `watchFeatureSagas`
- [ ] Use:
  - `call(apiFetchFeatureEntities, ...)`
  - `put(fetchFeatureEntitiesSuccess(...))`
- [ ] Add `watchFeatureSagas` to `rootSaga.js`

---

## 3. Create API Layer (`featureNameApi.js`)

- [ ] Define API functions like:
  - `apiFetchFeatureEntities`
  - `apiCreateFeatureEntity`
- [ ] Use `fetch` or `axios` to perform calls
- [ ] Throw an error on failed requests

---

## 4. (Alternative) Use React Query

- [ ] Create React Query hooks like:
  - `useFeatureEntitiesQuery.js`
  - `useFeatureEntityMutation.js`
- [ ] Wrap `apiFetchFeatureEntities()` in `useQuery()`
- [ ] Use `useMutation()` for POST/PUT

---

## 5. Build View Components

- [ ] Create components:
  - `FeatureEntityList.jsx`
  - `AddFeatureEntityForm.jsx`
- [ ] Use:
  - Redux: `useSelector`, `dispatch(fetchFeatureEntitiesRequest())`
  - React Query: `useQuery()` / `useMutation()`
- [ ] Display loading, error, and success states

---

## 6. Add Routing (if applicable)

- [ ] Add route in `main.jsx`:
  - `/featureEntities`
  - `/featureEntities/:id`
- [ ] Use `RequireAuth` to protect if needed
- [ ] Use `useParams()` to extract route params

---

## 7. Connect UI Events

- [ ] Wire form submissions or button clicks to:
  - `dispatch(fetchFeatureEntitiesRequest(...))` (Redux Saga)
  - `mutation.mutate(...)` (React Query)

---

## 8. Update Layout (Optional)

- [ ] Add link or menu item to sidebar/nav
- [ ] Conditionally show based on auth
- [ ] Add `dispatch(logout())` if needed

---

## 🔁 Naming Matrix Example (for "Product Categories")

| Element                | Example Name                          |
|------------------------|----------------------------------------|
| Redux action (trigger) | `fetchProductCategoriesRequest`        |
| Saga (worker)          | `fetchProductCategoriesSaga`           |
| API function           | `apiFetchProductCategories`            |
| Saga (watcher)         | `watchProductCategorySagas`            |
| Selector               | `selectProductCategories`              |
| Component              | `ProductCategoryList`                  |


---

## ⚠️ Naming Guidance: Avoid `fetch` in Mutating Auth Flows

The term `fetch` is best reserved for **retrieving data** (e.g., `fetchProductsRequest`, `fetchUserProfileRequest`).

For **mutating flows like login/logout**, use more precise verbs that reflect intent:

| Purpose            | ❌ Avoid                   | ✅ Use Instead          | Why?                                     |
|--------------------|---------------------------|-------------------------|------------------------------------------|
| Trigger login      | `fetchLoginRequest`       | `loginRequest`          | You're initiating a login, not fetching  |
| Login success      | `fetchLoginSuccess`       | `loginSuccess`          | Standard Redux naming convention         |
| Login failure      | `fetchLoginFailure`       | `loginFailure`          | Clear and consistent                     |
| Logout             | `fetchLogout`             | `logout`                | No need for a "fetch" prefix here        |

**Example Slice (Corrected):**

```js
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    }
  }
});
```

Use this convention for **clarity**, especially when combining Redux Toolkit + Sagas.
