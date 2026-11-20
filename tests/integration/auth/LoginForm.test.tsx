import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/features/login";
import { setAuth } from "@/stores/shared/sharedSlice";
import { renderWithProviders } from "../../utils/test-utils";
import { makeStore } from "@/stores/store";
const mocks = vi.hoisted(() => ({
  pushMock: vi.fn(),
  refreshMock: vi.fn(),
  submitLoginMock: vi.fn(),
  mutationState: {
    isLoading: false,
    isError: false,
    error: undefined as unknown,
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mocks.pushMock,
    refresh: mocks.refreshMock,
  }),
}));

vi.mock("@/features/login/api/auth.api", () => ({
  useSubmitLoginMutation: () => [
    (payload: unknown) => ({
      unwrap: () => mocks.submitLoginMock(payload),
    }),
    mocks.mutationState,
  ],
}));

vi.mock("@/features/login/api/login.api", () => ({
  useSubmitLoginMutation: () => [
    (payload: unknown) => ({
      unwrap: () => mocks.submitLoginMock(payload),
    }),
    mocks.mutationState,
  ],
}));

vi.mock("@/stores/features/authSLice", () => ({
  useSubmitLoginMutation: () => [
    (payload: unknown) => ({
      unwrap: () => mocks.submitLoginMock(payload),
    }),
    mocks.mutationState,
  ],
}));

describe("LoginForm", () => {
  beforeEach(() => {
    mocks.pushMock.mockClear();
    mocks.refreshMock.mockClear();
    mocks.submitLoginMock.mockReset();
    mocks.mutationState = {
      isLoading: false,
      isError: false,
      error: undefined,
    };
  });

  it("displays validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.click(screen.getByRole("button", { name: /^login$/i }));

    expect(await screen.findByText("username is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("toggles password input visibility", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(screen.getByRole("button", { name: /show password/i }));
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: /hide password/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("shows API error alert on invalid credentials", () => {
    mocks.mutationState = {
      isLoading: false,
      isError: true,
      error: { data: { message: "Invalid username or password" } },
    };

    renderWithProviders(<LoginForm />);

    expect(screen.getByText("Invalid username or password")).toBeInTheDocument();
    expect(mocks.pushMock).not.toHaveBeenCalled();
  });

  it("dispatches auth state and redirects to / on valid login", async () => {
    const user = userEvent.setup();
    mocks.submitLoginMock.mockResolvedValueOnce({ email: "sohag@example.com" });

    const store = makeStore();
    const dispatchSpy = vi.spyOn(store, "dispatch");

    renderWithProviders(<LoginForm />, { store });

    await user.type(screen.getByLabelText(/username/i), "sohag");
    await user.type(screen.getByPlaceholderText(/enter your password/i), "secret123");
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    await waitFor(() => {
      expect(mocks.submitLoginMock).toHaveBeenCalledWith({
        userName: "sohag",
        password: "secret123",
      });
      expect(mocks.refreshMock).toHaveBeenCalledTimes(1);
      expect(mocks.pushMock).toHaveBeenCalledWith("/");
    });

    expect(dispatchSpy).toHaveBeenCalledWith(setAuth({ email: "sohag@example.com" }));
  });
});
