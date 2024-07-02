import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import CSS if necessary

const UserDetailsSkeleton = () => {
  return (
    <SkeletonTheme color="#0e0c0c" highlightColor="#b8b8b8">
      <div className="px-4">
        <div className="row mb-4">
          <div className="col-md-3 px-0 mb-4">
            <Skeleton height={320} width={230} />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
              <div className="col-md-6 mb-3">
                <Skeleton height={43} width="100%" />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-4 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-4 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
        </div>
        <div className="row mt-4">
            <h5 className="fw-bold">Current Address</h5>
        </div>
        <div className="row mt-2">
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
        </div>

        <div className="row mt-4">
            <h5 className="fw-bold">Permanent Address</h5>
        </div>
        <div className="row mt-2">
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
          <div className="col-md-3 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-12 mb-2">
            <Skeleton height={40} width="100%" />
          </div>
        </div>
     
     
      </div>
    </SkeletonTheme>
  );
};

export default UserDetailsSkeleton;
