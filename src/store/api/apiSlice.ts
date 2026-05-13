import { createApi } from "@reduxjs/toolkit/query/react";
import { randomUUID } from "expo-crypto";

import { axiosBaseQuery } from "@/api/axios-base-query";

export interface Task {
  id: string;
  userId: string;
  task_date: string;
  text: string;
  done: boolean;
}

interface NewTask {
  userId: string;
  date: string;
  text: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["TaskRefresh"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], { date: string; userId: string }>({
      query: ({ date, userId }) => ({ url: `/tasks/list/${date}/${userId}` }),
      providesTags: ["TaskRefresh"],
    }),
    addNewTask: builder.mutation<Task, NewTask>({
      query: ({ text, date, userId }) => ({
        url: `/tasks/add/${date}/${userId}`,
        method: "POST",
        data: { text },
        headers: { "Content-Type": "application/json" },
      }),

      async onQueryStarted({ text, date, userId }, lifecycleApi) {
        const tempId = randomUUID();
        const getTasksPostResult = lifecycleApi.dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            { date, userId },
            (draft) => {
              draft.push({
                id: tempId,
                task_date: date,
                userId: userId,
                text: text,
                done: false,
              });
            },
          ),
        );

        try {
          const res = await lifecycleApi.queryFulfilled;
          lifecycleApi.dispatch(
            apiSlice.util.updateQueryData(
              "getTasks",
              { date, userId },
              (draft) => {
                const task = draft.find((task) => task.id === tempId);
                if (task) task.id = res.data.id;
              },
            ),
          );
        } catch {
          getTasksPostResult.undo();
        }
      },
    }),
    deleteTask: builder.mutation<
      Task,
      { id: string; date: string; userId: string }
    >({
      query: ({ date, id }) => ({
        url: `/tasks/delete/${date}/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted({ id, date, userId }, lifecycleApi) {
        const getTasksDeleteResult = lifecycleApi.dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            { date, userId },
            (draft) => {
              return draft.filter((task) => task.id !== id);
            },
          ),
        );

        try {
          await lifecycleApi.queryFulfilled;
        } catch {
          getTasksDeleteResult.undo();
        }
      },
    }),
    changeCheckBoxValue: builder.mutation<
      Task,
      { id: string; date: string; userId: string }
    >({
      query: ({ date, id }) => ({
        url: `/tasks/check/${date}/${id}`,
        method: "PATCH",
      }),

      async onQueryStarted({ id, date, userId }, lifecycleApi) {
        const getTasksPatchResult = lifecycleApi.dispatch(
          apiSlice.util.updateQueryData(
            "getTasks",
            { date, userId },
            (draft) => {
              const task = draft.find(
                (task) => task.id === id && task.task_date === date,
              );
              if (task) {
                task.done = !task.done;
              }
            },
          ),
        );

        try {
          await lifecycleApi.queryFulfilled;
        } catch {
          getTasksPatchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddNewTaskMutation,
  useChangeCheckBoxValueMutation,
  useDeleteTaskMutation,
} = apiSlice;
