import { RootState } from './store.store';
import { useSelector } from 'react-redux';

export const useAuthSelector = () => useSelector((state: RootState) => state.auth);
export const useUsersSelector = () => useSelector((state: RootState) => state.users);
export const useAppSettingsSelector = () => useSelector((state: RootState) => state.appSettings);
export const useAppPageSettingsSelector = () => useSelector((state: RootState) => state.appPage);

export const getIndexPage = (state: RootState) => state.appPage.indexPage;
export const getDevice = (state: RootState) => (state.appPage.isMobile ? 'mobile' : 'desktop');

export const transactionsSelector = (state: RootState) => state.transactions;
export const getAllTransactions = (state: RootState) => state.transactions.transactions;
export const useTransactionsSelector = () => useSelector((state: RootState) => state.transactions);

// export const categoriesSelector = (state: RootState) => state.categories;
// export const getAllCategories = (state: RootState) => state.categories.categories;
// export const getCategoriesByOwnerId = (ownerId: string) => (state: RootState) =>
//   state.categories.categories.filter(
//     (category: any) => category?.owner === ownerId || category?.owner?._id === ownerId
//   );
// export const getFilteredCategories = (state: RootState) => {
//   const { categories = [], isLoading, error } = state.categories;

//   const mainCategories = categories.filter((category: any) => !category.owner);
//   const subCategories = categories.filter((category: any) => category.owner);
//   return { mainCategories, subCategories, isLoading, error };
// };

// export const countsSelector = (state: RootState) => state.counts;
// export const getAllCounts = (state: RootState) => state.counts.counts;
// export const getCountsByOwnerId = (ownerId: string) => (state: RootState) =>
//   state.counts.counts.filter((count: any) => count?.owner === ownerId || count?.owner?._id === ownerId);
// export const getFilteredCounts = (state: RootState) => {
//   const { counts = [], isLoading, error } = state.counts;

//   const mainCounts = counts.filter((count: any) => !count.owner);
//   const subCounts = counts.filter((count: any) => count.owner);
//   return { mainCounts, subCounts, isLoading, error };
// };

// export const contractorsSelector = (state: RootState) => state.contractors;
// export const getAllContractors = (state: RootState) => state.contractors.contractors;

// export const documentsSelector = (state: RootState) => state.documents;
// export const getAllDocuments = (state: RootState) => state.documents.documents;

// export const postsSelector = state => state.posts;
// export const getAllPosts = state => state.posts.posts;
// export const getPostById =
//   id =>
//   ({ posts }) =>
//     posts.posts.find(post => post._id === id);
