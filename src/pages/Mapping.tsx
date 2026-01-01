import { useState } from "react";
import {
  Users,
  Calendar,
  PlayCircle,
  Loader2,
  CheckCircle,
  XCircle,
  X,
  AlertCircle,
  RefreshCw,
  Download,
  Database,
} from "lucide-react";
import { apiService } from "../services/apiService";

interface SyncResult {
  success: boolean;
  syncedCount?: number;
  failedCount?: number;
  results?: any[];
  error?: any;
}

const Mapping = () => {
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [loadingFetchPatients, setLoadingFetchPatients] = useState(false);
  const [loadingFetchAppointments, setLoadingFetchAppointments] =
    useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    type: "patients" | "appointments" | "fetch-patients" | "fetch-appointments";
    result: SyncResult | null;
    fetchedData?: any[];
  } | null>(null);

  const syncAllPatients = async () => {
    setLoadingPatients(true);
    try {
      const result = await apiService.syncAllPatients();
      setModalData({ type: "patients", result });
      setShowModal(true);
    } catch (error) {
      setModalData({
        type: "patients",
        result: { success: false, error: "Network error" },
      });
      setShowModal(true);
    } finally {
      setLoadingPatients(false);
    }
  };

  const syncAllAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const result = await apiService.syncAllAppointments();
      setModalData({ type: "appointments", result });
      setShowModal(true);
    } catch (error) {
      setModalData({
        type: "appointments",
        result: { success: false, error: "Network error" },
      });
      setShowModal(true);
    } finally {
      setLoadingAppointments(false);
    }
  };

  const fetchAllPatients = async () => {
    setLoadingFetchPatients(true);
    try {
      const data = await apiService.getAllPatients();
      setModalData({
        type: "fetch-patients",
        result: { success: true, syncedCount: data.length },
        fetchedData: data,
      });
      setShowModal(true);
    } catch (error) {
      setModalData({
        type: "fetch-patients",
        result: { success: false, error: "Failed to fetch patients" },
      });
      setShowModal(true);
    } finally {
      setLoadingFetchPatients(false);
    }
  };

  const fetchAllAppointments = async () => {
    setLoadingFetchAppointments(true);
    try {
      const data = await apiService.getAllAppointments();
      setModalData({
        type: "fetch-appointments",
        result: { success: true, syncedCount: data.length },
        fetchedData: data,
      });
      setShowModal(true);
    } catch (error) {
      setModalData({
        type: "fetch-appointments",
        result: { success: false, error: "Failed to fetch appointments" },
      });
      setShowModal(true);
    } finally {
      setLoadingFetchAppointments(false);
    }
  };

  const downloadCSV = () => {
    if (!modalData?.fetchedData) return;

    const data = modalData.fetchedData;
    if (data.length === 0) return;

    // Get all unique keys from all objects
    const allKeys = Array.from(
      new Set(data.flatMap((item) => Object.keys(item)))
    );

    // Create CSV header
    const header = allKeys.join(",");

    // Create CSV rows
    const rows = data.map((item) =>
      allKeys
        .map((key) => {
          const value = item[key];
          // Escape commas and quotes in values
          if (value === null || value === undefined) return "";
          const stringValue = String(value);
          if (stringValue.includes(",") || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(",")
    );

    const csv = [header, ...rows].join("\n");

    // Create download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${modalData.type}-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white px-8 py-10 shadow-md border-orange">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <PlayCircle className="h-8 w-8 text-black" />
              <h1 className="text-3xl font-bold text-black lg:text-4xl">
                Sync Operations
              </h1>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Trigger bulk sync operations to transfer patient and appointment
              data from OpenDental to GoHighLevel
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-slate-100 p-3">
              <Users className="h-8 w-8 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black">
                Sync All Patients
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Sync all patient records from OpenDental to GHL contacts.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Endpoint</span>
                    <code className="rounded bg-slate-200 px-2 py-1 font-mono text-black">
                      POST /od/sync/all-patients
                    </code>
                  </div>
                </div>
                <button
                  onClick={syncAllPatients}
                  disabled={loadingPatients}
                  className="w-full rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 flex items-center justify-center gap-2"
                >
                  {loadingPatients ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Syncing Patients...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" />
                      Start Patient Sync
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-slate-100 p-3">
              <Calendar className="h-8 w-8 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black">
                Sync All Appointments
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Sync all appointment records from OpenDental to GHL calendar.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Endpoint</span>
                    <code className="rounded bg-slate-200 px-2 py-1 font-mono text-black">
                      POST /od/sync/all-appointments
                    </code>
                  </div>
                </div>
                <button
                  onClick={syncAllAppointments}
                  disabled={loadingAppointments}
                  className="w-full rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 flex items-center justify-center gap-2"
                >
                  {loadingAppointments ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Syncing Appointments...
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" />
                      Start Appointment Sync
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-slate-100 p-3">
              <Database className="h-8 w-8 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black">
                Fetch All Patients
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Retrieve all patient records from OpenDental.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Endpoint</span>
                    <code className="rounded bg-slate-200 px-2 py-1 font-mono text-black">
                      GET /od/patients
                    </code>
                  </div>
                </div>
                <button
                  onClick={fetchAllPatients}
                  disabled={loadingFetchPatients}
                  className="w-full rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 flex items-center justify-center gap-2"
                >
                  {loadingFetchPatients ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Fetching Patients...
                    </>
                  ) : (
                    <>
                      <Database className="h-4 w-4" />
                      Fetch All Patients
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-slate-100 p-3">
              <Database className="h-8 w-8 text-black" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black">
                Fetch All Appointments
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Retrieve all appointment records from OpenDental.
              </p>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600">Endpoint</span>
                    <code className="rounded bg-slate-200 px-2 py-1 font-mono text-black">
                      GET /od/appointments
                    </code>
                  </div>
                </div>
                <button
                  onClick={fetchAllAppointments}
                  disabled={loadingFetchAppointments}
                  className="w-full rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 flex items-center justify-center gap-2"
                >
                  {loadingFetchAppointments ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Fetching Appointments...
                    </>
                  ) : (
                    <>
                      <Database className="h-4 w-4" />
                      Fetch All Appointments
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Result Modal */}
      {showModal && modalData && (
        <div className="fixed inset-0 z-50 top-[-32px] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-black">
                {modalData.type.includes("fetch")
                  ? "Fetch Results"
                  : "Sync Results"}
              </h3>
              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              {modalData.result?.success ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-100 p-2">
                      <CheckCircle className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-emerald-900">
                        {modalData.type.includes("fetch")
                          ? "Fetch Successful"
                          : "Sync Successful"}
                      </h4>
                      <p className="mt-1 text-sm text-emerald-700">
                        {modalData.type === "patients" && (
                          <>
                            Successfully synced{" "}
                            {modalData.result.syncedCount || 0} patients
                            {modalData.result.failedCount
                              ? ` (${modalData.result.failedCount} failed)`
                              : ""}
                          </>
                        )}
                        {modalData.type === "appointments" && (
                          <>
                            Successfully synced{" "}
                            {modalData.result.syncedCount || 0} appointments
                            {modalData.result.failedCount
                              ? ` (${modalData.result.failedCount} failed)`
                              : ""}
                          </>
                        )}
                        {modalData.type === "fetch-patients" && (
                          <>
                            Retrieved {modalData.result.syncedCount || 0}{" "}
                            patient records from OpenDental
                          </>
                        )}
                        {modalData.type === "fetch-appointments" && (
                          <>
                            Retrieved {modalData.result.syncedCount || 0}{" "}
                            appointment records from OpenDental
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {modalData.type.includes("fetch") &&
                    modalData.fetchedData && (
                      <div className="mt-4 pt-4 border-t border-emerald-200">
                        <button
                          onClick={downloadCSV}
                          className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                        >
                          <Download className="h-4 w-4" />
                          Download as CSV
                        </button>
                      </div>
                    )}
                </div>
              ) : (
                <div className="rounded-lg border border-rose-200 bg-rose-50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-rose-100 p-2">
                      <XCircle className="h-6 w-6 text-rose-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-rose-900">
                        {modalData.type.includes("fetch")
                          ? "Fetch Failed"
                          : "Sync Failed"}
                      </p>
                      <p className="text-sm text-rose-700">
                        {modalData.type.includes("fetch")
                          ? `An error occurred while fetching ${modalData.type.replace(
                              "fetch-",
                              ""
                            )} from OpenDental`
                          : `An error occurred while syncing ${
                              modalData.type === "patients"
                                ? "patients"
                                : "appointments"
                            }`}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 rounded bg-rose-100 p-3">
                    <p className="text-xs font-mono text-rose-800">
                      {modalData.result?.error?.toString() ||
                        "Unknown error occurred"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Close
              </button>
              {modalData.result?.success &&
                !modalData.type.includes("fetch") && (
                  <button
                    onClick={() => {
                      closeModal();
                      if (modalData.type === "patients") {
                        syncAllPatients();
                      } else {
                        syncAllAppointments();
                      }
                    }}
                    className="flex-1 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Sync Again
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mapping;
